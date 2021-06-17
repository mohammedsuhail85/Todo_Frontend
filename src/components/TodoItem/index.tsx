import { Col, Row, Button, Checkbox } from 'antd';
import TodoProps from './props'
import {
  DeleteOutlined
} from '@ant-design/icons';

const TodoItem = (props: TodoProps) => {

  const { todoData, markTodo, markTodoRemoved } = props;

  // Disabling the fields when the todo is REMOVED state
  return (
    <Row className={todoData.state === "REMOVED" ? "Todo-item Deleted" : "Todo-item"} justify='space-between'>
      <Col span={2}>
        <Button disabled={todoData.state === "REMOVED" ? true : false} icon={<DeleteOutlined />} type="link" onClick={() => markTodoRemoved(todoData)} />
      </Col>
      <Col span={20} style={{ textAlign: 'left' }}>
        {todoData.title}
      </Col>
      <Col span={2}>
        <Checkbox disabled={todoData.state === "REMOVED" ? true : false} checked={todoData.active} onChange={() => markTodo(todoData, !todoData.active)} />
      </Col>
    </Row>
  )
}

export default TodoItem;