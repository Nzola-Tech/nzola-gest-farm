import DefaultLayout from "@/layouts/default";
import { Todo } from "@/types";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { Form, } from "@heroui/form";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@heroui/modal";
import { ScrollShadow } from "@heroui/scroll-shadow";
import { useState } from "react";

export default function IndexPage() {
  const [todos, setTodos] = useState<Todo[]>([
    {
      title: "title 1",
      description: "Description 1"
    },
    {
      title: "title 2",
      description: "Description 2"
    }
  ])
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [viewIndex, setViewIndex] = useState<number | null>(null);


  const handleData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    setTodos([...todos, { title, description }]);
    setTitle("");
    setDescription("");

  }

  const openEditModal = (index: number) => {
    setEditIndex(index);
    setEditTitle(todos[index].title);
    setEditDescription(todos[index].description);
    onOpen();
  };

  // Abrir modal de visualização
  const openViewModal = (index: number) => {
    setViewIndex(index);
    setIsViewOpen(true);
  };

  const handleEditSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedTodos = [...todos];
      updatedTodos[editIndex] = { title: editTitle, description: editDescription };
      setTodos(updatedTodos);
    }
    onClose();
  };

  const deleteTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  }

  const closeViewModal = () => {
    setViewIndex(null);
    setIsViewOpen(false);
  };

  return (
    <DefaultLayout>
      <div className="flex flex-row gap-20 justify-center">
        <Form
          className="w-2/4"
          onSubmit={handleData}
        >

          <Input
            name="title"
            label="Title"
            type="text"
            value={title}
            onValueChange={setTitle}
            isRequired
            errorMessage="Enter a title for your do to item"
            placeholder="Enter your Title"
            className="mb-4"
            size="lg"
          />
          <Textarea
            name="description"
            label="Description"
            value={description}
            type="text"
            onValueChange={setDescription}
            isRequired
            errorMessage="Enter your description"
            className="mb-4"
            placeholder="Enter your description"
          />
          <div>
            <Button
              color="primary"
              size="lg"
              type="submit"
              endContent={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              }
            >
              Add
            </Button>
            <Button
              size="lg"
              type="reset"
              className="ml-4"
              endContent={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              }
            >
              Reset
            </Button>
          </div>

        </Form>
        <ScrollShadow hideScrollBar className="w-2/4  max-h-[600px] overflow-y-auto">
          <ul>
            {
              todos.map((todo, index) => (
                <li
                  key={index}
                  className="ml-auto mb-4 p-4 border border-gray-300 rounded-lg flex row justify-between items-center"
                >
                  <div>
                    <h2 className="text-xl font-bold">{todo.title}</h2>
                    <p>{todo.description}</p>
                  </div>
                  <div className="flex flex-col-reverse gap-4">
                    <Button color="danger" size="sm"
                      name="delete"
                      onPress={() => deleteTodo(index)}
                      endContent={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                      }
                    >
                      Delete

                    </Button>
                    <Button color="warning" size="sm"
                      name="edit"
                      onPress={() => openEditModal(index)}
                      endContent={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                      }
                    >

                      <span
                        className="font-medium"
                      >
                        Edit
                      </span>
                    </Button>
                    <Button
                      color="primary"
                      size="sm"
                      onPress={() => openViewModal(index)}
                      endContent={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                      }
                    >
                      <span className="font-medium">Open</span>
                    </Button>
                  </div>
                </li>
              ))
            }
          </ul>
        </ScrollShadow>
      </div>


      <Modal isOpen={isViewOpen} onClose={closeViewModal} backdrop="blur">
        <ModalContent>
          <ModalHeader>View Todo</ModalHeader>
          <ModalBody>
            {viewIndex !== null && (
              <div>
                <div className="mb-4">
                  <span className="font-bold">Title:</span>
                  <div className="mt-1">{todos[viewIndex].title}</div>
                </div>
                <div>
                  <span className="font-bold">Description:</span>
                  <div className="mt-1">{todos[viewIndex].description}</div>
                </div>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onPress={closeViewModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        backdrop="blur"
      >
        <ModalContent>
          <ModalHeader>Editar Todo</ModalHeader>
          <ModalBody>
            <Form id="edit-todo-form" onSubmit={handleEditSave}>
              <Input
                name="editTitle"
                label="Título"
                value={editTitle}
                onValueChange={setEditTitle}
                className="mb-4"
                isRequired
              />
              <Textarea
                name="editDescription"
                label="Descrição"
                value={editDescription}
                onValueChange={setEditDescription}
                className="mb-4"
                isRequired
              />
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit" form="edit-todo-form">
              Salvar
            </Button>
            <Button color="danger" variant="light" onPress={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </DefaultLayout>
  );
}
