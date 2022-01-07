import PropTypes from 'prop-types'

const TableCol = ({title, content}) => {
    return (
        <div className='level-item has-text-centered'>
            <div>
                <p className='heading is-size-4 has-text-grey-light'>{title}</p>
                <p className='title has-text-black'>{content}</p>
            </div>
        </div>
    )
}

TableCol.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
}

export default TableCol