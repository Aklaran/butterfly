import React from 'react';
import TrickController from '@/controllers/trick-controller';

export default function Tricktionary() {
	const controller = new TrickController();

	controller.getTricks();

	return <ul>the big list</ul>;
}
