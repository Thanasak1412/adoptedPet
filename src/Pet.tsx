import { Link } from "react-router-dom";
import { Animal } from "./APIResponseTypes";

interface IProps {
  id: number;
  name: string;
  animal: Animal;
  breed: string;
  images: string[];
  location: string;
}

const Pet = (props: IProps) => {
  const { name, animal, breed, images, location, id } = props;

  let hero = "http://pets-images.dev-apis.com/pets/none.jpg";
  if (images.length) {
    hero = images[0];
  }

  return (
    <Link to={`/details/${id}`} className="relative block">
      <div className="image-container">
        <img data-testid="thumbnail" src={hero} alt={name} />
      </div>
      <div className="absolute left-0 bottom-0 bg-gradient-to-tr from-white to-transparent p-2">
        <h1>{name}</h1>
        <h2>{`${animal} — ${breed} — ${location}`}</h2>
      </div>
    </Link>
  );
};

export default Pet;
