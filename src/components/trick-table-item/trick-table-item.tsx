import Link from 'next/link';
import React from 'react';

import AnnotatedTrick from '@/models/annotated-trick/annotated-trick';

import styles from './trick-table-item.module.css';

export default function TrickTableItem({ trick }: { trick: AnnotatedTrick }) {
	console.log('creating TrickTableItem for:', trick);
	console.log('trick.isActive()?', trick.isActive());

	return (
		<li className={styles.wrapper}>
			<Link href={`/tricks/${trick.name}`}>
				<p>{trick.name}</p>

				<input type='checkbox' readOnly checked={trick.isActive()} />
			</Link>
		</li>
	);
}

// TODO: When I get back, gotta make the TrickDetail page and link to it in the listitems DONE
// then merge this pr and rebase the UserTrick pr DONE
// then wire up the UserTrick controller
// then figure out where to place userID and default trickset generation in the app
// then create a TrickAnnotationService to overlay the UserTrick and Trick models to inform the UI
// ^ that will also require updating the Trick model to have `active` booleans for each entry transition and landing stance
// then make a computed "active" property of Trick to inform the checkbox display on the index
// then wire up Update actions on the UserTrickController to the TrickDetail page
