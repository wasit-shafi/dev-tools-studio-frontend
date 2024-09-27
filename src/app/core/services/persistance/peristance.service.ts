import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class PersistanceService {
	constructor() {}

	set(key: string, data: unknown): void {
		try {
			localStorage.setItem(key, JSON.stringify(data));
		} catch (error) {
			console.error('Error while saving data in local storage');
		}
	}
	get(key: string): unknown {
		try {
			const localStorageItem = localStorage.getItem(key);
			return localStorageItem ? JSON.parse(localStorageItem) : null;
		} catch (error) {
			console.error('Error while getting data in local storage');
			return null;
		}
	}
}
