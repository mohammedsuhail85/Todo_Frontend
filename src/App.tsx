import './App.less';
import { Layout } from "antd";
import { Header } from "antd/lib/layout/layout";
import Todo from './module/todo';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Layout>
          <Header className="App-header">Simple Todo Application</Header>
          <Todo />
        </Layout>
      </div>
    </QueryClientProvider>
  );
}

export default App;
