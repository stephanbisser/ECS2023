Change Public Hostname in env file to:
bisserio.eu.ngrok.io

gulp manifest
gulp serve

Install npm packages:
npm i @microsoft/mgt @microsoft/mgt-react

Change the tab content:

// --- Import all necessary components
import { Providers, TeamsProvider } from "@microsoft/mgt"
import { Login, Agenda, Todo, FileList } from "@microsoft/mgt-react";
import * as microsoftTeams from "@microsoft/teams-js";
// ---



// --- Add TeamsProvider
    TeamsProvider.microsoftTeamsLib = microsoftTeams;
    Providers.globalProvider = new TeamsProvider({
        clientId: 'dacb55b6-2ebe-4d56-b498-5a08c524c535',
        scopes: ['User.Read', 'Calendars.Read', 'Tasks.Read', 'Tasks.ReadWrite', 'Files.Read' ],
        authPopupUrl: "/auth.html"
    });
    // ---


return (
        <Provider theme={theme}>
            <Flex column>
                <Segment color="brand" content="CollabSummit rocks!" inverted>
                    <Header content="CollabSummit rocks!" color="white" />
                    <Login/>
                </Segment>
                <Segment>
                    <Flex gap="gap.small">
                        <Segment>
                            <Text content="Your meetings" weight="bold" />
                            <Agenda/>
                        </Segment>
                        <Segment>
                            <Text content="Your tasks" weight="bold" />
                            <Todo />
                        </Segment>
                        <Segment>
                            <Text content="Your files" weight="bold" />
                            <FileList/>
                        </Segment>
                    </Flex>
                </Segment>
                <Segment color="brand" content="Footer" inverted>
                    <Text size="smaller" content="(C) Copyright PnP" />
                </Segment>
            </Flex>
        </Provider>
    );