import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { useMemo } from "react";
import './App.css';
import Navbar from './NavBar';
import Home from './Home';
import Table from './Table';
import useOctokit from './useOctokit'

function App() {
  const { repos, branchProtected, unprotected, isPending, error } = useOctokit();

  const columns = useMemo(
    () => [
      {
        Header: "Repositories",
        columns: [
          {
            Header: "Name",
            accessor: "node.name"
          },
          {
            Header: "Branch Protection Rules",
            accessor: "node.branchProtectionRules.totalCount"
          },
          {
            Header: "Last updated",
            accessor: "node.updatedAt"
          }
        ]
      }
    ],
    []
  );

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className='content'>
          <Switch>
            <Route exact path="/">
              <Home repos={repos} branchProtected={branchProtected} unprotected={unprotected} isPending={isPending} error={error} />
            </Route>
            <Route path="/branchProtected">
              <Table columns={columns} data={branchProtected} />
            </Route>
            <Route path="/upProtected">
              <Table columns={columns} data={unprotected} />
            </Route>
            {/* <Route path="/create">
              <Create />
            </Route>
            <Route path="*">
              <NotFound />
            </Route> */}
          </Switch>
        </div>
      </div>
    </Router>    
  );
}

export default App;