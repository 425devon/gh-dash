import { Link } from "react-router-dom";

const Home = ({columns, repos, branchProtected, unprotected, isPending, error }) => {
    return (
        <div className="home">
            <h2>Welcome</h2>
            { isPending && <div> loading...</div>}
            { error && <div>error: { error }</div> }
            { repos && <div>Finished Scanning { repos.length } repositories!</div> }
            { repos && 
                <div className="blog-preview">
                    <Link to={'/branchProtected'}> There are { branchProtected.length } branch protected repositories! </Link>
                </div> 
            }
            { repos && 
                <div className="blog-preview">
                    <Link to={'/unProtected'}> There are { unprotected.length } unprotected repositories! </Link>
                </div> 
            }
        </div>
    );
}
 
export default Home;