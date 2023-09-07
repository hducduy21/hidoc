import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import styles from './search.scss';
import classNames from 'classnames';
const cx = classNames.bind(styles);

function Search() {
    return (
        <div className={cx('wrapper')}>
            <form className={cx('form')}>
                <input type="text" placeholder="Tìm kiếm bác sỹ, bệnh viện,..."></input>
                <button
                    type="button"
                    className={cx('search')}
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </form>
        </div>
    );
}

export default Search;
