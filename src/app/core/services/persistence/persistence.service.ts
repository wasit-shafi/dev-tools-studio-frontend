import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class PersistenceService {
	constructor() {}

	public get(key: string): unknown {
		try {
			const localStorageItem = localStorage.getItem(key);
			return localStorageItem ? JSON.parse(localStorageItem) : null;
		} catch (error) {
			console.error('Error while getting data from local storage');
			return null;
		}
	}

	public set(key: string, data: unknown): void {
		try {
			localStorage.setItem(key, JSON.stringify(data));
		} catch (error) {
			console.error('Error while saving data in local storage');
		}
	}

	public remove(key: string): void {
		try {
			localStorage.removeItem(key);
		} catch (error) {
			console.error('Error while removing data from local storage');
		}
	}

	public clear(): void {
		localStorage.clear();
	}
}
