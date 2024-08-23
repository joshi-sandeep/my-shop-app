import 'bootstrap/dist/css/bootstrap.min.css';
import AllProductsView from "./estoreApp/Components/AllProductsView";
// import ExampleComponent from "./estoreApp/Components/ExampleComponent";
// const AllProductsView = lazy(() => import('./estoreApp/Components/AllProductsView'));
// const ExampleComponent = lazy(() => import('./estoreApp/Components/ExampleComponent'));
function App() {
  return (
    <>
      {/* <Suspense fallback={<p>Loading AllProductsView Component...</p>}> */}
        <AllProductsView />
      {/* </Suspense> */}
      {/* <Suspense fallback={<p>Loading Example Component...</p>}>
        <ExampleComponent />
      </Suspense> */}
    </>


  )

}
export default App;

