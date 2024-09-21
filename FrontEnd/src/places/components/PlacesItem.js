import React, { useContext, useState } from "react";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";

import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";
import { AuthContext } from "../../shared/context/auth-context";

import "./PlaceItem.css";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const PlacesItem = (props) => {
  const auth = useContext(AuthContext);

  const [show, setShow] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const openModalHandler = () => setShow(true);
  const closeModalHandler = () => setShow(false);

  const openDeleteModal = () => setShowDeleteModal(true);
  const closeDeleteModal = () => setShowDeleteModal(false);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const history = useHistory();

  const deletePlaceHandler = async () => {
    try {
      await sendRequest(`http://loclhost:5000/api/places/${props.id}`, "DELETE");
      history.push("/");
    } catch (err) {}
    closeDeleteModal();
  };

  return (
    <React.Fragment>
      <Modal
        show={show}
        onCancel={closeModalHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeModalHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={showDeleteModal}
        onCancel={closeDeleteModal}
        header="Confirm delete ?"
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button onClick={closeDeleteModal}>CANCEL</Button>
            <Button danger onClick={deletePlaceHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p className="center">Do you want to proceed and delete this place?</p>
      </Modal>
      <li className="place-item center">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="plce-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openModalHandler}>
              OPEN MAP
            </Button>
            {auth.userId === props.creator && (
              <React.Fragment>
                <Button to={`/places/${props.id}`}>EDIT</Button>
                <Button danger onClick={openDeleteModal}>
                  DELETE
                </Button>
              </React.Fragment>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlacesItem;
