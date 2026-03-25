import { useEffect, useState } from "react";
import axiosIntance from "../api/axiosInstance";
import Card from "../components/Card";
import { Col, Container, Row } from "react-bootstrap";
import { SearchIcon } from "lucide-react";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [category, setCategory] = useState("All Blogs");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    axiosIntance
      .get("/Blogs")
      .then((res) => {
        setBlogs(res.data);
        setFilteredBlogs(res.data);
      })
      .catch((err) => {
        console.log("Error hai bhai", err);
      });
  }, []);

  useEffect(() => {
    let updated = [...blogs];
    if (search.trim()) {
      updated = updated.filter(
        (blog) =>
          blog.title.toLowerCase().includes(search.toLowerCase()) ||
          blog.author.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "All Blogs") {
      updated = updated.filter((blog) => blog.tag === category);
    }

    if (sort === "author") {
      updated.sort((a, b) => a.author.localeCompare(b.author));
    } else if (sort === "title") {
      updated.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === "date") {
      updated.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    setFilteredBlogs(updated);
  }, [blogs, category, sort, search]);

  return (
    <div className="bg-gradient-to-r from-indigo-200 to-purple-200 py-5">
      <Container>
        <div className="d-flex w-full flex-column pt-20 flex-md-row justify-content-between align-items-center gap-3 mb-5">  
          <h2 className="w-50">All Blogs</h2>

          <div className="d-flex align-items-center gap-3 w-[60%] border-1 border-white rounded-xl pl-4 outline-none w-md-full w-sm-100%">
            <SearchIcon size={20}/>
            <input
              type="text"
              placeholder="Search by title or author"
              className="h-[45px] w-[100%] w-md-auto pr-3 outline-none border-0"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center pb-10">
          {/* CATEGORY */}
          <select
            className="w-auto w-md-auto pr-4 cursor-pointer outline-none border-0"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>All Blogs</option>
            <option value="Education">Education</option>
            <option value="Designs">Designs</option>
            <option value="FrontEnd">FrontEnd</option>
            <option value="Health">Health</option>
            <option value="Festival">Festival</option>
            <option value="Technology">Technology</option>
            <option value="News">News</option>
          </select>

          <select
            className="w-30 w-md-auto cursor-pointer  outline-none border-0"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="author">Author</option>
            <option value="title">Title</option>
            <option value="date">Date</option>
          </select>
        </div>

        <Row className="g-3">
          {filteredBlogs.map((blog) => (
            <Col
              key={blog.id}
              xs={12}
              sm={6}
              md={4}
              lg={4}
              className="d-flex justify-content-center"
            >
              <Card blogs={blog} />
            </Col>
          ))}
        </Row>

      </Container>
    </div>
  );
};

export default BlogList;