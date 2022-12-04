// import RepoList from "./repoList";
import useOctokit from "./useOctokit";
import Table from "./Table";

const Home = () => {
    const { repos, branchProtected, unprotected, isPending, error } = useOctokit();

    return (
        <div className="home">
            <h2>Welcome</h2>
            { isPending && <div> loading...</div>}
            { error && <div>error: { error }</div> }
            { repos && <div>Finished Scanning { repos.length } repositories!</div> }
            { repos && <div className="blog-preview">There are { branchProtected.length } branch protected repositories!</div> }
            { repos && <div className="blog-preview">There are { unprotected.length } unprotected repositories!</div> }
            {/* { repos && <RepoList repos={ branchProtected } title="Protected repos"/>} */}
            { repos && <Table data={branchProtected} />}
        </div>
    );
}
 
export default Home;