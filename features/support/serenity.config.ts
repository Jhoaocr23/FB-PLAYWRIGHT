import { AfterAll, BeforeAll, setDefaultTimeout } from '@cucumber/cucumber';
import { configure, Duration } from '@serenity-js/core';
import path from 'path';
import * as playwright from 'playwright';

import { Actors } from '../../test';

const timeouts = {
    cucumber: {
        step: Duration.ofSeconds(30),                       
    },
    playwright: {
        defaultNavigationTimeout: Duration.ofSeconds(30),   
        defaultTimeout:           Duration.ofSeconds(30),    
    },
    serenity: {
        cueTimeout:               Duration.ofSeconds(30),    
    }
}

let browser: playwright.Browser;

// Configure default Cucumber step timeout
setDefaultTimeout(timeouts.cucumber.step.inMilliseconds());

BeforeAll(async () => {
    
    browser = await playwright.chromium.launch({
        headless: false,
        slowMo: 100
    });

    // Configure Serenity/JS
    configure({

        // Configure Serenity/JS actors to use Playwright browser
        actors: new Actors(browser, {
            baseURL:                    'https://facebook.com/',
            defaultNavigationTimeout:   timeouts.playwright.defaultNavigationTimeout.inMilliseconds(),
            defaultTimeout:             timeouts.playwright.defaultTimeout.inMilliseconds(),
        }),

        // Configure Serenity/JS reporting services
        crew: [
            [ '@serenity-js/console-reporter', { theme: 'auto' } ],
            [ '@serenity-js/web:Photographer', {
                strategy: 'TakePhotosOfInteractions',    // capture screenshots of all the interactions; slower but more comprehensive
                // strategy: 'TakePhotosOfFailures',           // capture screenshots of failed interactions; much faster
            } ],
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: path.resolve(__dirname, '../../target/site/serenity') } ],
            [ '@serenity-js/serenity-bdd', { specDirectory: path.resolve(__dirname, '../../features') } ],
        ],

        cueTimeout: timeouts.serenity.cueTimeout,
    });
});

AfterAll(async () => {
    // Close the browser after all the tests are finished
    if (browser) {
        await browser.close();
    }
})
