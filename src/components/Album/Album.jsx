import classNames from 'classnames';
import React, { useState } from 'react';
import styles from './styles.module.css'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { selectAlbumById } from '../../features/albums/selectors';
import { useSelector } from 'react-redux';

export const Album = ({ slides = [], albumId }) => {

	const [current, setCurrent] = useState(0);
	const length = slides.length;

	const album = useSelector(state => selectAlbumById(state, albumId))[0]

	const nextSlide = () => {
		setCurrent(current === length - 1 ? 0 : current + 1);
	};

	const prevSlide = () => {
		setCurrent(current === 0 ? length - 1 : current - 1);
	};

	if (!Array.isArray(slides) || slides.length <= 0) {
		return null;
	}

	return (
		<div className={classNames(styles.section)}>
			<h3 className={classNames(styles.title)}>{album.title}</h3>
			<section className={classNames(styles.slider)}>
				<FaAngleLeft className={classNames(styles['left-arrow'])} onClick={prevSlide} />
				<FaAngleRight className={classNames(styles['right-arrow'])} onClick={nextSlide} />
				{slides.map((slide, index) => {
					return (
						<div
							className={classNames(index === current ? styles['slide active'] : styles.slide)}
							key={index}
						>
							{index === current && (
								<img src={slide.url} alt='color' className={classNames(styles.image)} />
							)}
						</div>
					);
				})}
			</section>
		</div>
	);
};