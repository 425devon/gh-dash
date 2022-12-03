import useOctokit from "./useOctokit";

const Home = () => {
    const { repos, branchProtected, unprotected, isPending, error } = useOctokit();
    return (
        <div className="home">
            <h2>Welcome</h2>
            { isPending && <div> loading...</div>}
            { error && <div>error: { error }</div> }
            { repos && <div>Finished Scanning { repos.length } repositories!</div> }
            { repos && <div>There are { branchProtected.length } branch protected repositories!</div> }
            { repos && <div>There are { unprotected.length } unprotected repositories!</div> }
            {/* {repos && repos.map(repo => (
                <div className="blog-preview" key={repo.node.id}>
                    <h2>{repo.node.name} is protected: {repo.node.branchProtectionRules.totalCount > 0 ? 'true' : 'false' }</h2>
                </div>
            ))} */}
        </div>
    );
}
 
export default Home;