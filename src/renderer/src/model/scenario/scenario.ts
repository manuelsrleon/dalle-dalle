import ChallengeData from "./challenge-data";
import SuccessData from "./success-data";
import FailureData from "./failure-data";
import ScenarioSettings from "./scenario-settings";

export default interface Scenario {
    type?: string,
    title: string,
    subtitle?: string,
    challenge: ChallengeData,
    successData: SuccessData,
    failureData: FailureData,
    settings: ScenarioSettings | undefined
}