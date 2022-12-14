import { Link } from 'react-router-dom';

const Navbar = () => {
    return ( 
        <nav className="navbar">
            <h1>github dashboard</h1>
            <div className="links">
                <Link to="/">Home</Link>
                {/* inline style example as js object */}
                <Link to="/create" style={{
                    color: 'white',
                    backgroundColor: '#f1356d',
                    borderRadius: '8px'
                }}>Do Awesome stuff!</Link>
            </div>
        </nav>
     );
}
 
export default Navbar;