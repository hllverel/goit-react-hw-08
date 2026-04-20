import css from './SearchBox.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { changeFilter, selectNameFilter } from '../../redux/filters/slice';

export default function SearchBox() {
    const dispatch = useDispatch();
    const filter = useSelector(selectNameFilter);

    return (
        <div className={css.searchbox}>
            <p>Find contacts by name or number</p>
            <input
                type="text"
                value={filter}
                onChange={(e) => dispatch(changeFilter(e.target.value))}
            />
        </div>
    )
}