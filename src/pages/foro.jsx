import { useState } from 'react';
import miPerfil from '../img/perfil.jpeg';
import perfil1 from '../img/perfil1.jpeg';
import perfil2 from '../img/perfil2.jpeg';
import perfil3 from '../img/perfil3.jpeg';

const Foro = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Ana García',
      timeAgo: 'Hace 2 horas',
      title: 'Opiniones del curso de Programación 1',
      comments: 22,
      replies: [
        { id: 1, author: 'Carlos Rodríguez', text: 'Estoy de acuerdo con el curso', profileImg: perfil1 },
        { id: 2, author: 'Laura Martínez', text: 'Me parece interesante también', profileImg: perfil2 }
      ],
    },
    {
      id: 2,
      author: 'Carlos Rodríguez',
      timeAgo: 'Hace 23 horas',
      title: 'Resumen de clase 1',
      comments: 4,
      replies: [
        { id: 1, author: 'Ana García', text: 'El resumen es muy completo', profileImg: perfil3 },
      ],
    },
    {
      id: 3,
      author: 'Laura Martínez',
      timeAgo: 'Hace 1 día',
      title: 'Resumen de clase 5',
      comments: 1,
      replies: [],
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;
  const [newQuery, setNewQuery] = useState('');
  const [newReply, setNewReply] = useState('');

  // Asociamos las imágenes a los autores
  const getProfileImage = (author) => {
    switch (author) {
      case 'Ana García':
        return perfil3;
      case 'Carlos Rodríguez':
        return perfil1;
      case 'Laura Martínez':
        return perfil2;
      default:
        return miPerfil;
    }
  };

  // Función para agregar una nueva consulta
  const handleNewQuery = () => {
    if (newQuery.trim()) {
      const newPost = {
        id: posts.length + 1,
        author: 'Nuevo Autor',
        timeAgo: 'Hace unos segundos',
        title: newQuery,
        comments: 0,
        replies: [],
      };
      setPosts([newPost, ...posts]);
      setNewQuery(''); // Limpiar el input después de enviar
    }
  };

  // Función para agregar una nueva respuesta
  const handleAddReply = (postId) => {
    if (newReply.trim()) {
      const newPosts = posts.map(post => {
        if (post.id === postId) {
          const newReplyObj = {
            id: post.replies.length + 1,
            author: 'Nuevo Autor',
            text: newReply,
            profileImg: miPerfil,
          };
          return {
            ...post,
            replies: [...post.replies, newReplyObj],
            comments: post.comments + 1,
          };
        }
        return post;
      });
      setPosts(newPosts);
      setNewReply(''); // Limpiar el input después de enviar
    }
  };

  // Paginación: determinar los posts actuales según la página
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Cambiar la página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold text-center text-teal-600 mb-8">Foro de Discusión</h1>

      {/* Formulario para nueva consulta */}
      <div className="mb-8">
        <input
          type="text"
          value={newQuery}
          placeholder="¿Tienes alguna consulta?"
          className="border-2 border-teal-500 p-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300 transition"
          onChange={(e) => setNewQuery(e.target.value)}
        />
        <div className="flex justify-end mt-2">
          <button
            className="bg-teal-600 text-white py-2 px-6 rounded-lg hover:bg-teal-700"
            onClick={handleNewQuery}
          >
            Enviar Consulta
          </button>
        </div>
        <span className="text-sm text-gray-500">Presiona el botón para enviar tu consulta</span>
      </div>

      <div className="space-y-8">
        {currentPosts.map((post) => (
          <div key={post.id} className="foro-item bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <img src={getProfileImage(post.author)} alt="Mi Perfil" className="w-full h-full rounded-full object-cover" />
                </div>
                <span className="font-semibold text-lg text-gray-700">{post.author}</span>
              </div>
              <span className="text-gray-500 text-sm">{post.timeAgo}</span>
            </div>

            <h2 className="text-2xl font-semibold text-teal-600 mb-3">{post.title}</h2>
            <div className="flex items-center space-x-3 text-gray-600 mb-4">
              <span className="bg-teal-100 text-teal-600 rounded-full px-3 py-1 text-sm font-medium">
                {post.comments} Comentarios
              </span>
            </div>

            {/* Mostrar las respuestas del foro */}
            <div className="mt-4 space-y-4">
              {post.replies.map((reply) => (
                <div key={reply.id} className="border-t pt-3 mt-3">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <img
                        src={getProfileImage(reply.author)}
                        alt="Perfil"
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <span className="font-semibold ml-2 text-gray-700">{reply.author}</span>
                  </div>
                  <p className="text-gray-600 mt-2">{reply.text}</p>
                </div>
              ))}

              {/* Formulario para agregar respuesta */}
              <div className="mt-4">
                <input
                  type="text"
                  value={newReply}
                  placeholder="Escribe una respuesta..."
                  className="border-2 border-teal-500 p-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300 transition"
                  onChange={(e) => setNewReply(e.target.value)}
                />
                <div className="flex justify-end mt-2">
                  <button
                    className="bg-teal-600 text-white py-2 px-6 rounded-lg hover:bg-teal-700"
                    onClick={() => handleAddReply(post.id)}
                  >
                    Enviar Respuesta
                  </button>
                </div>
                <span className="text-sm text-gray-500">Presiona el botón para enviar tu respuesta</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Paginación */}
      {posts.length > postsPerPage && (
        <div className="flex justify-center mt-8 space-x-2">
          <button
            className="bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <button
            className="bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(posts.length / postsPerPage)}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

export default Foro;
