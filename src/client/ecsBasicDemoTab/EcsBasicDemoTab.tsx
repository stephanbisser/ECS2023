import * as React from "react";
import { Provider, Flex, Text, Button, Header, Segment } from "@fluentui/react-northstar";
import { useState, useEffect } from "react";
import { useTeams } from "msteams-react-base-component";
import { app } from "@microsoft/teams-js";

// --- Import all necessary components
import { Providers, TeamsProvider } from "@microsoft/mgt"
import { Login, Agenda, Todo, FileList } from "@microsoft/mgt-react";
import * as microsoftTeams from "@microsoft/teams-js";
// ---

/**
 * Implementation of the ECSBasicDemo Tab content page
 */
export const EcsBasicDemoTab = () => {

    // --- Add TeamsProvider
    TeamsProvider.microsoftTeamsLib = microsoftTeams;
    Providers.globalProvider = new TeamsProvider({
        clientId: 'dacb55b6-2ebe-4d56-b498-5a08c524c535',
        scopes: ['User.Read', 'Calendars.Read', 'Tasks.Read', 'Tasks.ReadWrite', 'Files.Read' ],
        authPopupUrl: "/auth.html"
    });
    // ---

    const [{ inTeams, theme, context }] = useTeams();
    const [entityId, setEntityId] = useState<string | undefined>();

    useEffect(() => {
        if (inTeams === true) {
            app.notifySuccess();
        } else {
            setEntityId("Not in Microsoft Teams");
        }
    }, [inTeams]);

    useEffect(() => {
        if (context) {
            setEntityId(context.page.id);
        }
    }, [context]);

    /**
     * The render() method to create the UI of the tab
     */
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
                       {/*
                        <Segment>
                            <Text content="Your stats" weight="bold" />
                            <Flex column>
                            <Segment>
                                    <Card aria-roledescription="card with action buttons">
                                        <Card.Header fitted>
                                            <Text content="Vacation" weight="bold"/>
                                        </Card.Header>
                                        <Card.Body fitted>
                                            <Flex column gap="gap.small">
                                                <Text content="You currently have 15 days of vacation left for this year" />
                                            </Flex>
                                        </Card.Body>
                                        <Card.Footer fitted>
                                            <Flex space="between">
                                                <Button content="Request Vacation" />
                                            </Flex>
                                        </Card.Footer>
                                    </Card>
                                </Segment>
                                <Segment>
                                    <Card aria-roledescription="card with action buttons">
                                        <Card.Header fitted>
                                            <Text content="Overtime" weight="bold"/>
                                        </Card.Header>
                                        <Card.Body fitted>
                                            <Flex column gap="gap.small">
                                                <Text content="You currently have 42 extra hours. Make sure to work on your work-life balance!" />
                                            </Flex>
                                        </Card.Body>
                                    </Card>
                                </Segment>
                            </Flex>
                        </Segment>
                        */} 
                    </Flex>
                </Segment>
                <Segment color="brand" content="Footer" inverted>
                    <Text size="smaller" content="(C) Copyright PnP" />
                </Segment>
            </Flex>
        </Provider>
    );
};
