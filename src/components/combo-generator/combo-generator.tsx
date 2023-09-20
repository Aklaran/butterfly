'use client';
import React from 'react';

import UserTrickData from '@/models/user-trick/user-trick-data';
import { TrickData } from '@/models/trick/trick';
import TrickAnnotationService from '@/services/trick-annotation-service';
import generateCombos from '@/services/combo-generation-service';
import { DataTable } from '@/components/ui/data-table';
import { columns } from '@/components/combo-generator/columns';
import { Combo } from '@/models/combo/combo';
import { Button } from '../ui/button';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

export default function ComboGenerator({
	tricks,
	userTricks,
}: {
	tricks: TrickData[];
	userTricks: UserTrickData[] | null;
}) {
	const annotationService = new TrickAnnotationService();
	const annotatedTricks = annotationService.annotateTricks(
		tricks,
		userTricks
	);

	const [numPossibleCombos, setNumPossibleCombos] = React.useState(0);
	const [generatedCombos, setGeneratedCombos] = React.useState<Combo[]>([]);

	const formSchema = z.object({
		length: z.number().min(0).max(10),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			length: 3,
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		const { length } = values;
		const combos = generateCombos(annotatedTricks, length);
		// TODO: inject interface ComboSelector
		const selector = new RandomComboSelector(combos);
		const selectedCombos = selector.take(5);

		if (combos.length === 0) {
			// TODO: Add error toast or dialog
			console.error(
				'Unable to generate any combos. Try reducing the length or adding more tricks!'
			);
		} else {
			setNumPossibleCombos(combos.length);
			setGeneratedCombos(selectedCombos);
		}
	}

	return (
		<div>
			<div>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-8'
					>
						<FormField
							control={form.control}
							name='length'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Length</FormLabel>
									<FormControl>
										<Select
											onValueChange={(value) =>
												field.onChange(Number(value))
											}
											defaultValue={field.value.toString()}
										>
											<SelectTrigger className='w-[180px]'>
												<SelectValue placeholder='Length' />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value='2'>
													2
												</SelectItem>
												<SelectItem value='3'>
													3
												</SelectItem>
												<SelectItem value='4'>
													4
												</SelectItem>
												<SelectItem value='5'>
													5 (this will crash the app)
												</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
									<FormDescription>
										The length of combos you want to
										generate.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type='submit'>Generate</Button>
					</form>
				</Form>
			</div>
			{generatedCombos.length > 0 && (
				<div>
					<h1 className='text-lg font-bold'>
						Combos (showing 5 of {numPossibleCombos} possible)
					</h1>
					<DataTable columns={columns} data={generatedCombos} />
				</div>
			)}
		</div>
	);
}

class RandomComboSelector {
	constructor(public combos: Combo[]) {}

	take(n: number) {
		const randomCombos: Combo[] = Array.from({ length: n }, () =>
			this.getRandomElement(this.combos)
		);
		return randomCombos;
	}

	private getRandomElement<T>(array: T[]): T {
		return array[(Math.random() * array.length) | 0];
	}
}
