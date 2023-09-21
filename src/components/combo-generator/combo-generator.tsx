'use client';
import React from 'react';

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
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { AlertCircle } from 'lucide-react';
import { Separator } from '../ui/separator';
import UserTrickController from '@/controllers/user-trick-controller';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../spinner/spinner';

export default function ComboGenerator({ tricks }: { tricks: TrickData[] }) {
	const [numPossibleCombos, setNumPossibleCombos] = React.useState(0);
	const [generatedCombos, setGeneratedCombos] = React.useState<Combo[]>([]);
	const [hasGenerated, setHasGenerated] = React.useState(false);
	const [isGenerating, setIsGenerating] = React.useState(false);

	const formSchema = z.object({
		length: z.number().min(0).max(10),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			length: 3,
		},
	});

	const userTrickController = new UserTrickController();

	const userTrickQuery = useQuery({
		queryKey: ['user-tricks'],
		queryFn: () => userTrickController.getAllUserTricks(),
	});

	if (userTrickQuery.isLoading) {
		return <Spinner />;
	}

	if (userTrickQuery.isError)
		return `An error occurred: ${userTrickQuery.error}`;

	const annotationService = new TrickAnnotationService();
	const annotatedTricks = annotationService.annotateTricks(
		tricks,
		userTrickQuery.data
	);

	function onSubmit(values: z.infer<typeof formSchema>) {
		const { length } = values;

		setIsGenerating(true);
		const combos = generateCombos(annotatedTricks, length);
		setIsGenerating(false);
		// TODO: inject interface ComboSelector
		const selector = new RandomComboSelector(combos);
		const selectedCombos = selector.take(5);

		setHasGenerated(true);

		if (combos.length === 0) {
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
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-8 flex flex-col p-3 items-stretch'
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
											<SelectItem value='2'>2</SelectItem>
											<SelectItem value='3'>3</SelectItem>
											<SelectItem value='4'>4</SelectItem>
											<SelectItem value='5'>
												5 (this will crash the app)
											</SelectItem>
										</SelectContent>
									</Select>
								</FormControl>
								<FormDescription>
									How long you want the combo to be.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type='submit'>Generate</Button>
				</form>
			</Form>
			<Separator className='my-2' />
			{isGenerating && <Spinner />}
			{hasGenerated && generatedCombos.length === 0 && (
				<Alert
					variant='destructive'
					className='border border-red-500 rounded-md'
				>
					<AlertCircle className='h-4 w-4' />
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>
						Unable to generate any combos. Try reducing the length
						or adding more tricks!
					</AlertDescription>
				</Alert>
			)}
			{generatedCombos.length > 0 && (
				<div className='p-2'>
					<h1 className='text-lg font-bold text-center'>
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
