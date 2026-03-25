import { Modal,Button } from 'react-bootstrap'


const Modal = ({show,closeModal,type,blog,onDelete}) => {
  return (
    <Modal show={show} onHide={closeModal}>
      <Modal.Header closeModal>
        <Modal.Title>
          {type === "view" && "Blog Details"}
          {type === "edit" && "Edit Blog"}
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        {type === "view" && (
          <>
          <h4>{blog.title}</h4>
          <p><strong>{blog.author}</strong></p>
          <p>{blog.content}</p>
          </>
        )}
        {type === "delete" && (
         <p>Are you sure you want to delete this blog?</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        {type === "delete" && (
          <Button variant='danger' onClick={()=> onDelete(blog.id)}>
            Delete
          </Button>
        )}
        
        <Button varient='secondary'>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Modal