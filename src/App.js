import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const fetchData = async function () {
    const resp = await fetch("https://dummyjson.com/products?limit=100");
    const data = await resp.json();
    setProducts(data.products);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlepagechange = function (i) {
    setPage(i);
  };

  return (
    <div className="App">
      {products.length > 0 && (
        <div className="products">
          {products.slice(page * 10 - 10, page * 10).map((prod) => {
            return (
              <span className="products__single" key={prod.id}>
                <img src={prod.thumbnail} alt={prod.title} />
                <span className="products__name">{prod.brand}</span>
              </span>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          {Array(products.length / 10)
            .fill()
            .map((_, i) => {
              return (
                <> 
            
                
                <span
                  key={i}
                  className={i + 1 === page ? "page_selected" : "page_value"}
                  onClick={() => handlepagechange(i + 1)}
                >
                  {" "}
                  {i + 1}
                </span>
                </>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default App;
