import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { GetCollectionsQuery } from '../../../common/generated-types';
import { DataService } from '../../providers/data/data.service';

@Component({
    selector: 'vsf-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {

    collections$: Observable<GetCollectionsQuery['collections']['items']>;
    heroImage: SafeUrl;

    //form fields
      // Dati per le opzioni
    carBrands: any[] = ["Brand1","Brand2","Brand3"];
    carModels: any[] = ["Model1","Model2","Model3"];
    numberPlate: string;
    
    selectedBrands: string[] = [];
    selectedModels: string[] = [];

    constructor(private dataService: DataService) {
    }

    ngOnInit(): void {
        this.collections$ = this.dataService.query<GetCollectionsQuery>(GET_COLLECTIONS, {
            options: { take: 50 },
        }).pipe(map(({collections}) => collections.items));
        this.heroImage = this.getHeroImageUrl();

        // this.dataService.getCarBrands().subscribe(data => {
        //     this.carBrands = data;
        //   });
      
        //   this.preferencesService.getLanguages().subscribe(data => {
        //     this.languages = data;
        //   });
      
        //   this.preferencesService.getFoods().subscribe(data => {
        //     this.foods = data;
        //   });
    }

    private getHeroImageUrl(): string {
        //const {apiHost, apiPort} = environment;
        //return `${apiHost}:${apiPort}/assets/preview/a2/thomas-serer-420833-unsplash__preview.jpg`;
        return "./assets/hero_ubek.png"
    }
    onSubmit() {
        alert('Checkbox form submitted!');
      }

}

const GET_COLLECTIONS = gql`
    query GetCollections($options: CollectionListOptions) {
        collections(options: $options) {
            items {
                id
                name
                slug
                parent {
                    id
                    slug
                    name
                }
                featuredAsset {
                    id
                    preview
                }
            }
        }
    }
`;
