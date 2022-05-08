import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import Button from './Button'

const Header = ({ title, onShow, isShowAdd }) => {
  const loc = useLocation();

  return (
    <header className='header'>
      <h1>{title}</h1>
      { loc.pathname === '/' && <Button 
        color={isShowAdd ? 'red' : 'green'}
        text={isShowAdd ? 'Close' : 'Add'}
        onClick={onShow} 
      /> }
    </header>
  );
}

Header.defaultProps = {
  title: 'Task Tracker'
};

Header.propTypes = {
  title: PropTypes.string
};

export default Header;
