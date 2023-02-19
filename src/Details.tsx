import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "./Modal";
import ErrorBoundary from "./ErrorBoundary";
import Carousel from "./Carousel";
// contexts
import { adopted } from "./adoptedPetSlice";
import { useGetPetQuery } from "./petApiService";

const Details = () => {
  const { id } = useParams();

  if (!id) {
    throw new Error("Why did you not id, I wanted to have an id.");
  }

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, data: pet } = useGetPetQuery(id);

  if (isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }

  return (
    <div className="details">
      <Carousel images={pet?.images} />
      <div>
        {pet && (
          <>
            <h1>{pet.name}</h1>
            <h2>{`${pet.animal} — ${pet.breed} — ${pet.city}, ${pet.state}`}</h2>
            <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
            <p>{pet.description}</p>
            {showModal ? (
              <Modal>
                <div>
                  <h1>Would you like to adopt {pet.name}?</h1>
                  <div className="buttons">
                    <button
                      onClick={() => {
                        dispatch(adopted({ pet }));
                        navigate("/");
                      }}
                    >
                      Yes
                    </button>
                    <button onClick={() => setShowModal(false)}>No</button>
                  </div>
                </div>
              </Modal>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
};

export default function DetailsErrorBoundary() {
  return (
    <ErrorBoundary>
      <Details />
    </ErrorBoundary>
  );
}
