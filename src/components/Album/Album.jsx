import classNames from 'classnames';
import React, { useState } from 'react';
import styles from './styles.module.css'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

export const Album = ({ slides = [] }) => {

	const [current, setCurrent] = useState(0);
	const length = slides.length;

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
	);
};