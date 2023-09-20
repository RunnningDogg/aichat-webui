import FadeInComponent from "../components/FadeInComponent";

const colors = [
  "whitesmoke",
  "snow",
  "tomato",
  "lightgoldenrodyellow",
  "brown",
  "lightcoral",
  "darkseagreen",
  "chartreuse",
  "darkblue",
  "mistyrose",
  "saddlebrown",
  "darkkhaki",
  "gray",
  "cornflowerblue",
];

function Demo() {
  return (
    <div>
      {colors.map((color) => (
        <FadeInComponent key={color}>
          <div
            className="box"
            style={{ backgroundColor: color, height: "100vh", width: "50vw" }}
          >
            <span>{color}</span>
          </div>
        </FadeInComponent>
      ))}
    </div>
  );
}

export default Demo;
