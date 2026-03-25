import { Container, Button, Card, Modal } from "react-bootstrap";
import axiosIntance from "../api/axiosInstance";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CalendarDays, Newspaper, SquarePen } from "lucide-react";

export const blogSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  author: Yup.string().required("Author is required"),
  content: Yup.string().min(10).required(),
  date: Yup.string().required(),
  tag: Yup.string().required(),
});

const Cards = ({ blogs, onDelete, onUpdate }) => {
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(blogSchema),
  });

  const openDetailsModal = () => setShowDetailsModal(true);
  const openDeleteModal = () => setShowModal(true);

  const openEditModal = () => {
    setValue("title", blogs.title);
    setValue("author", blogs.author);
    setValue("content", blogs.content);
    setValue("date", blogs.date?.split("T")[0] || blogs.date);
    setValue("tag", blogs.tag);

    setShowEditModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setShowDetailsModal(false);
    setShowEditModal(false);
    reset();
  };

  const confirmDelete = () => {
    axiosIntance
      .delete(`/Blogs/${blogs.id}`)
      .then(() => {
        if (onDelete) onDelete(blogs.id);
        closeModal();
      })
      .catch(console.log);
  };

  const onSubmit = (data) => {
    axiosIntance
      .put(`/Blogs/${blogs.id}`, data)
      .then((res) => {
        console.log("Updated Successfully", res.data);
        if (onUpdate) {
          onUpdate(blogs.id, data);
          closeModal();
        }
      })
      .catch((err) => {
        console.log("Error in updation", err);
      });
  };

  return (
    <>
      <Card className="py-3 px-4 w-[100%] h-full hover:shadow-xl transition duration-300 hover:-translate-y-1 hover:shadow-lg transition duration-300 bg-transparent border-1 border-white rounded-3">
        <Card.Body>
          <h2>{blogs.title}</h2>
          <Card.Text>{blogs.author}</Card.Text>
          <Card.Text>{blogs.date}</Card.Text>
          <Card.Text className="text-muted">{blogs.tag}</Card.Text>

          <Container className="d-flex flex-column gap-2 p-0">
            <Button variant="dark" onClick={openDetailsModal}>
              Details
            </Button>
            <Button variant="danger" onClick={openDeleteModal}>
              Delete
            </Button>
            <Button variant="success" onClick={openEditModal}>
              Edit
            </Button>
          </Container>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={closeModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Delete Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete?</Modal.Body>
        <Modal.Footer>
          <Button onClick={closeModal}>Cancel</Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDetailsModal} onHide={closeModal} centered size="lg">
        <Modal.Header closeButton className="border-0 pb-0 px-5">
          <Modal.Title className="fw-bold pt-4 d-flex align-items-center gap-3 mb-3"><Newspaper /> Blog Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-5 border-0 px-5">
          
          <h3 className="fw-bold mb-2">{blogs.title}</h3>
          <div className="d-flex align-items-center gap-5 text-muted small mb-3 mt-5">
            <span className="text-white rounded-pill p-2 px-4 bg-dark">{blogs.tag}</span>
            <span className="d-flex gap-2 align-items-center"><SquarePen /> {blogs.author}</span>
            <span className="d-flex gap-2 align-items-center"><CalendarDays /> {blogs.date}</span>
          </div>
          <div
            style={{
              maxHeight: "500px",
              overflowY: "auto",
              lineHeight: "1.6",
            }}
            className=" py-3 text-justify text-xl"
          >
            {blogs.content}
          </div>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          <Button variant="outline-dark" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={closeModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Blog</Modal.Title>
        </Modal.Header>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <input className="form-control mb-2" {...register("title")} />
            <p className="text-danger">{errors.title?.message}</p>

            <input className="form-control mb-2" {...register("author")} />
            <p className="text-danger">{errors.author?.message}</p>

            <textarea className="form-control mb-2" {...register("content")} />
            <p className="text-danger">{errors.content?.message}</p>

            <input
              type="date"
              className="form-control mb-2"
              {...register("date")}
            />
            <p className="text-danger">{errors.date?.message}</p>
            <input
              className="form-control mb-2"
              placeholder="Tags"
              {...register("tag")}
            />
            <p className="text-danger">{errors.tag?.message}</p>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={closeModal}>Cancel</Button>
            <Button type="submit" variant="success">
              Update
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default Cards;
