import { StatusPill } from '../../../components/common/StatusPill';

export function WorkflowConfiguration() {
  return (
    <div className="stack-list">
      <StatusPill tone="info" label="Read Only" />

      <p>Service Operations Rules</p>

      <p>Research Review Policies</p>

      <p>Citizen Intake Routing</p>

      <p>Representative Assistant Controls</p>
    </div>
  );
}