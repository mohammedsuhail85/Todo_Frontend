import { useQuery } from "react-query";
import axios from "axios";
import { Todo } from "../../utils/types/Todo.type";
import TodoItem from "../../components/TodoItem";
import { message, Checkbox, Button, Form, Row, Col, Input, Modal, Select, DatePicker } from "antd";
import { useState } from "react";

const TodoScreen = () => {

  const { Option } = Select;
  const [showAll, setShowAll] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [modalVisible, setModalVisble] = useState(false)
  const [orderBy, setOrderBy] = useState('')

  // Feching the todos from backend
  const { data, refetch } = useQuery<Todo[]>('Todos', async () => {
    return (await axios.get('http://localhost:1337/api/todos/')).data
  })

  // API call for mark the todo is active
  const markTodo = (input: Todo, value: boolean) => {
    axios({
      method: 'PUT',
      url: `http://localhost:1337/api/todos/${input._id}`,
      data: {
        active: value
      }
    }).then(() => {
      message.success("Record Updated");
      refetch();
    }).catch(err => {
      message.error(JSON.stringify(err.response.data));
    })
  }

  // API call for mark the todo is removed
  const markTodoRemoved = (input: Todo) => {

    if (input.state === "REMOVED") {
      message.warn("Record already deleted")
    } else {
      axios({
        method: 'PUT',
        url: `http://localhost:1337/api/todos/${input._id}`,
        data: {
          state: "REMOVED"
        }
      }).then(() => {
        message.success("Record Removed");
        refetch();
      }).catch(err => {
        message.error(JSON.stringify(err.response.data));
      })
    }
  }

  // API call for add new Todo
  const onFinish = (values: any) => {
    setLoading(true);
    axios({
      method: 'POST',
      url: 'http://localhost:1337/api/todos/',
      data: {
        title: values.todo,
        active: false,
        endDate: values.endDate
      }
    }).then(() => {
      message.success("Record Added");
      refetch();
      form.resetFields()
      setLoading(false);
    }).catch(err => {
      message.error(JSON.stringify(err.response.data));
      setLoading(false);
    })
  }

  return (
    <div className="Todo-container">
      {/* Todo options */}
      <Row justify='space-between' className="center">
        <Col>
          <Button size="large" onClick={() => setModalVisble(true)}>Add Todo</Button>
        </Col>
        <Col>
          <Checkbox checked={showAll} onClick={() => setShowAll(!showAll)}>Show All</Checkbox>
          <Select defaultValue={"asc"} onChange={(value: string) => { setOrderBy(value) }}>
            <Option value="asc">Ascending</Option>
            <Option value="dsc">Descending</Option>
            <Option value="date">End date</Option>
          </Select>
        </Col>
      </Row>

      {/* Rendering the Todos */}
      {data?.filter(e => e.state !== (showAll ? "" : "REMOVED"))
        .sort((a, b) => {
          switch (orderBy) {
            case "asc":
              return a.title.localeCompare(b.title)
            case "dsc":
              return b.title.localeCompare(a.title)
            case "endDate":
              //@ts-ignore
              return a.endDate - b.endDate
            default:
              return a.title.localeCompare(b.title)
          }
        }).map(e => {
          return (
            <TodoItem key={e._id} todoData={e} markTodo={markTodo} markTodoRemoved={markTodoRemoved} />
          )
        })}

      {/* Model for add new Todos */}
      <Modal title="Add new todo" visible={modalVisible} footer={null} centered={true} onCancel={() => setModalVisble(false)}>
        <Form
          name="todo-add-form"
          layout="vertical"
          requiredMark={false}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            name="todo"
            label={
              "Todo title"
            }
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
          >
            <Input
              placeholder="Add new todo"
              size='large'
            />
          </Form.Item>
          <Form.Item
            name="endDate"
            label={
              "End Date"
            }
          >
            <DatePicker size="large" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              block>
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div >)
}

export default TodoScreen;