import { BrowserRouter } from "react-router-dom"
import Routing from "./routing/Routing"
import NavigationBar from "./components/layout/NavigationBar"
import FooterBar from './components/layout/FooterBar'

function App() {
  
  return (
    <BrowserRouter>
    <NavigationBar/>
    <Routing/>
    <FooterBar/>
    </BrowserRouter>
  )
}

export default App


// Build a responsive, user-friendly blog management dashboard where users can Create, Read, Update and Delete Features:  Create ( C ) – Hooks form to write a new blog post with fields: title, author, content, tags and published date. Validation included.  Read ( R ) – Display all blog posts in a list/grid view. Each post shows: title, author,tags and time of submission. To view the total content user needs to click on details button; a modal will be shown with details of the blog.  Update ( U ) – Edit and existing blog post via the same form used for creation ( pre-filled with current data)  Delete ( D ) – Confirm and delete functionality for individual posts Designs:  Blog list view: Card-based layout with filtering/sorting( e.g. by date, author)  Blog detail view: Full post in a modal with clean typography, author info, and edit/delete buttons  Create/edit form: Clean form with proper validation  Navigation: Proper header with links  Responsive design: Works on desktop, laptop, and mobile