import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title, onShow, isShowAdd }) => {
  return (
    <header className='header'>
      <h1>{title}</h1>
      <Button 
        color={isShowAdd ? 'red' : 'green'}
        text={isShowAdd ? 'Close' : 'Add'}
        onClick={onShow} 
      />
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
