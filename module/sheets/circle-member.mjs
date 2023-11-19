const groups = [
    {
        id: "nerve",
        name: "CANDELA.CircleMemberActionsNerveName",
        actions: [
            {
                id: "move",
                name: "CANDELA.CircleMemberActionsMoveName",
                description: "CANDELA.CircleMemberActionsMoveDescription",
            },
            {
                id: "strike",
                name: "CANDELA.CircleMemberActionsStrikeName",
                description: "CANDELA.CircleMemberActionsStrikeDescription",
            },
            {
                id: "control",
                name: "CANDELA.CircleMemberActionsControlName",
                description: "CANDELA.CircleMemberActionsControlDescription"
            }
        ]
    },
    {
        id: "cunning",
        name: "CANDELA.CircleMemberActionsCunningName",
        actions: [
            {
                id: "sway",
                name: "CANDELA.CircleMemberActionsSwayName",
                description: "CANDELA.CircleMemberActionsSwayDescription"
            },
            {
                id: "read",
                name: "CANDELA.CircleMemberActionsReadName",
                description: "CANDELA.CircleMemberActionsReadDescription"
            },
            {
                id: "hide",
                name: "CANDELA.CircleMemberActionsHideName",
                description: "CANDELA.CircleMemberActionsHideDescription"
            }
        ]
    },
    {
        id: "intuition",
        name: "CANDELA.CircleMemberActionsIntuitionName",
        actions: [
            {
                id: "survey",
                name: "CANDELA.CircleMemberActionsSurveyName",
                description: "CANDELA.CircleMemberActionsSurveyDescription"
            },
            {
                id: "focus",
                name: "CANDELA.CircleMemberActionsFocusName",
                description: "CANDELA.CircleMemberActionsFocusDescription"
            },
            {
                id: "sense",
                name: "CANDELA.CircleMemberActionsSenseName",
                description: "CANDELA.CircleMemberActionsSenseDescription"
            }
        ]
    }
];

export default class CircleMember extends CandelaActor {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            template: "systems/candelaobscura/module/sheets/circle-member.hbs",
            height: 850,
            width: 1200,
        });
    }

    constructor(props) {
        super(props);
    }

    getData() {
        const context = super.getData();
        const actorData = context.actor.system;

        context.data = this.#prepareCharacterData(actorData);

        console.log(context);

        return context;
    }

    activateListeners(html) {
        html.find('input').change(this.#onChange.bind(this))
        html.find('.action-roll').click(this.#onActionRoll.bind(this))

        super.activateListeners(html);
    }

    #prepareCharacterData(actor) {
        return groups.map((group) => ({
            ...group,
            drive: actor.groups[group.id].drive,
            maxDrive: actor.groups[group.id].maxDrive,
            resistance: actor.groups[group.id].resistance,
            actions: group.actions.map((action) => ({
                ...action,
                rating: actor.actions[action.id].rating,
                isGilded: actor.actions[action.id].isGilded,
            }))
        }));
    }

    #onChange(event) {
        console.log(event);
        switch (true) {
            case event.target.name.startsWith('actionRating'):
                this.#onChangeActionRating(event);
                return;

            case event.target.name.startsWith('actionGilded'):
                this.#onChangeActionGilded(event);
                return;

            case event.target.name.startsWith('drive'):
                this.#onChangeDrive(event);
                return;

            case event.target.name.startsWith('maxDrive'):
                this.#onChangeMaxDrive(event);
                return;
        }
    }

    #onChangeActionRating(event) {
        event.preventDefault();

        const actionId = event.target.name.split('[')[1].slice(0, -1);
        const rating = Number(event.target.value);

        console.log(actionId, rating);

        this.actor.setActionRating(actionId, rating);
    }

    #onChangeActionGilded(event) {
        event.preventDefault();

        const actionId = event.target.name.split('[')[1].slice(0, -1);
        const isGilded = event.target.checked;

        console.log(actionId, isGilded);

        // this.update((character) => character.setActionGilded(actionId, isGilded));
    }

    #onChangeDrive(event) {
        event.preventDefault();

        const groupId = event.target.name.split('[')[1].slice(0, -1);
        const drive = Number(event.target.value);

        console.log(groupId, drive)

        // this.update((character) => character.setDrive(groupId, drive));
    }

    #onChangeMaxDrive(event) {
        event.preventDefault();

        const groupId = event.target.name.split('[')[1].slice(0, -1);
        const maxDrive = Number(event.target.value);

        console.log(groupId, maxDrive)

        // this.actor.update((character) => character.setMaxDrive(groupId, maxDrive));
    }


    async #onActionRoll(event) {
        event.preventDefault();

        const actionId = event.target.dataset.actionId;
        const data = this.getData();

        await this.#getActionRollData(actionId);

        if (actionId === undefined) {
            return;
        }
    }

    async #getActionRollData(actionId) {
        const data = this.getData().data.system;

        const action = data.actions[actionId];

        console.log(data);
    }
}
