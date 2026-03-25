import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  FloatingLabel,
  Stack,
} from "react-bootstrap";

const blogSchema = Yup.object().shape({
  title: Yup.string().min(5).max(100).required(),
  author: Yup.string().min(2).max(50).required(),
  content: Yup.string().min(20).required(),
  date: Yup.string().required(),
  tag: Yup.string()
    .min(2)
    .max(30)
    .matches(/^[a-zA-Z0-9-_]+$/)
    .required(),
});

const CreateBlog = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(blogSchema),
  });

  const submitData = (data) => {
    axiosInstance
      .post("/Blogs", data)
      .then(() => {
        setIsSubmitted(true);
        reset();
      })
      .catch(console.log);
  };

  return (
    <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center py-4 bg-gradient-to-r from-indigo-200 to-purple-200">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={10} md={8} lg={5}>
          <Card className="shadow-lg p-4 border-1 border-white rounded-4 bg-transparent">
            <Card.Body>
              <h4 className="text-center mb-4">
                {isSubmitted
                  ? "Blog Added Successfully"
                  : "Create New Blog"}
              </h4>
              
              <Form onSubmit={handleSubmit(submitData)} className="">
                <Stack gap={3}>
                  <FloatingLabel label="Title">
                    <Form.Control
                      type="text"
                      placeholder="Title"
                      className="outline-none bg-transparent border-1 border-white"
                      {...register("title")}
                      isInvalid={!!errors.title}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.title?.message}
                    </Form.Control.Feedback>
                  </FloatingLabel>

                  <FloatingLabel label="Author">
                    <Form.Control
                      type="text"
                      placeholder="Author"
                      className="outline-none bg-transparent border-1 border-white"
                      {...register("author")}
                      isInvalid={!!errors.author}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.author?.message}
                    </Form.Control.Feedback>
                  </FloatingLabel>

                  <FloatingLabel label="Content" className="m-0 ">
                    <Form.Control
                      as="textarea"
                      placeholder="Content"
                      className="outline-none rows-5 bg-transparent border-1 border-white"
                      {...register("content")}
                      isInvalid={!!errors.content}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.content?.message}
                    </Form.Control.Feedback>
                  </FloatingLabel>

                  <FloatingLabel label="Date">
                    <Form.Control
                      type="date"
                      className="outline-none bg-transparent border-1 border-white"
                      {...register("date")}
                      isInvalid={!!errors.date}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.date?.message}
                    </Form.Control.Feedback>
                  </FloatingLabel>

                  <FloatingLabel label="Tag">
                    <Form.Control
                      type="text"
                      placeholder="Tag"
                      className="outline-none bg-transparent border-1 border-white"
                      {...register("tag")}
                      isInvalid={!!errors.tag}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.tag?.message}
                    </Form.Control.Feedback>
                  </FloatingLabel>

                  <Button type="submit" variant="dark" size="lg" className="w-100 mt-3">
                    Add Blog
                  </Button>
                </Stack>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateBlog;