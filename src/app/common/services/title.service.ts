import {Injectable} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {environment} from '../../../environments/environment';
/**
 * @Author: open-source GPL
 * @Date: 23.09.2018 21:00
 */
@Injectable()
export class TitleService extends Title {

    /**
     * Get the title of the current HTML document.
     * @returns {string}
     */
    private getTabTitle(): string {
        return this.getTitle();
    }

    /**
     * Set the title of the current HTML document.
     * @param newTitle
     */
    setTabTitle(newTitle: string) {
        if (newTitle) {
            this.setTitle(newTitle + ' - ' + environment.title_suffix);
        } else {
            this.setTitle(environment.title_suffix);
        }
    }

    prefixTabTitle(prefix: string) {
        this.setTitle(prefix + ' - ' + this.getTabTitle());
    }

}
