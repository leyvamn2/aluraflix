import styled from "styled-components";
import { useContext } from "react";
import PropTypes from "prop-types";
import Banner from "../../components/Banner";
import CourseSection from "../../components/CourseSection";
import Modal from "../../components/Modal";
import Popup from "../../components/Popup";
import { GlobalContext } from "../../context/Context";

const HomeContainer = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-bottom: 100px;

  @media (min-width: 1024px) {
    padding-bottom: 0;
  }
`;

const NoVideosMessage = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  font-size: 2.4rem;
  font-weight: bold;
  background-color: var(--main-background-black);
  color: var(--secondary-white);
  padding: 40px 0 140px;

  @media (min-width: 1024px) {
    padding-bottom: 0;
  }
`;

const Home = () => {
  const { categories, selectedVideo, setSelectedVideo, videos, popup } =
    useContext(GlobalContext);

  const categoriesWithVideos = categories.filter((category) =>
    videos.some((video) => video.Categoria === category.nombre)
  );

  return (
    <HomeContainer>
      <Banner />
      {videos.length > 0 ? (
        categoriesWithVideos.map((category) => (
          <CourseSection key={category.id} category={category} />
        ))
      ) : (
        <NoVideosMessage>No hay videos que mostrar</NoVideosMessage>
      )}
      {selectedVideo && (
        <Modal video={selectedVideo} closeModal={() => setSelectedVideo(null)} />
      )}
      {popup.show && <Popup message={popup.message} type={popup.type} />}
    </HomeContainer>
  );
};

Home.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      nombre: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedVideo: PropTypes.object,
  setSelectedVideo: PropTypes.func.isRequired,
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      Categoria: PropTypes.string.isRequired,
    })
  ).isRequired,
  popup: PropTypes.shape({
    show: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};

export default Home;
