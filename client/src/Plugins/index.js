import components from './Components';
import domain from './Domain';

const install = app => {
	components(app)
	domain(app)
}

export default install
