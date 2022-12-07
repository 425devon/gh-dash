// import { Link } from "react-router-dom";

const RepoList = ({repos, title}) => {

    return ( 
        <div className="blog-list">
            <h2>{ title }</h2>
        {repos.map(repo => (
            <div className="blog-preview" key={repo.node.id} >
                <h2>{repo.node.name}</h2>
                {/* <Link to={`/blogs/${blog.id}`}>
                    <h2>{ blog.title }</h2>
                    <p>Written by { blog.author }</p>
                </Link> */}
            </div>
        ))}
        </div>
     );
}
 
export default RepoList;