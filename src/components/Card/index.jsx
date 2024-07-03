import styled from "styled-components";
import PropTypes from "prop-types";
import { useContext } from "react";
import EditButton from "./EditButton";
import deleteIcon from "./borrar.png";
import editIcon from "./editar.png";
import { GlobalContext } from "../../context/Context";

const CardContainer = styled.article`
  width: 374px;
  min-width: 374px;
  height: 278px;
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  z-index: 1;
  display: flex;
  flex-direction: column;

  @media (min-width: 1024px) {
    width: 430px;
    min-width: 430px;
    height: 318px;
  }
`;

const Shadow = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: inset 0px 0px 10px 4px ${(props) => props.color};
  pointer-events: none;
`;

const ImageStyles = styled.img`
  aspect-ratio: 16 / 9;
  width: 100%;
`;

const ButtonContainer = styled.div`
  width: 100%;
  min-height: 52px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: var(--secondary-background-dark-blue);
  border-top: 4px solid ${(props) => props.color};
  color: var(--secondary-white-matte);
`;

const TextStyles = styled.p`
  background-color: var(--secondary-background-dark-blue);
  color: var(--secondary-white-matte);
  padding: 10px;
  border-radius: 5px;
  margin: 0;
`;

const Card = ({ color, video }) => {
  const { linkImagenVideo, titulo } = video;
  const { setSelectedVideo, deleteVideo } = useContext(GlobalContext);

  return (
    <CardContainer>
      <ImageStyles src={linkImagenVideo} alt={titulo} />
      <ButtonContainer color={color}>
        <EditButton action={() => deleteVideo(video.id)} video={video} img={deleteIcon}>
          Borrar
        </EditButton>
        <EditButton action={() => setSelectedVideo(video)} video={video} img={editIcon}>
          Editar
        </EditButton>
      </ButtonContainer>
      <Shadow color={color} />
    </CardContainer>
  );
};

Card.propTypes = {
  color: PropTypes.string.isRequired,
  video: PropTypes.shape({
    id: PropTypes.string.isRequired,
    linkImagenVideo: PropTypes.string.isRequired,
    titulo: PropTypes.string.isRequired,
  }).isRequired,
};

export default Card;
