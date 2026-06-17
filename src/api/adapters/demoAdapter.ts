import {
  administrationSnapshot,
  assistantSnapshot,
  citizenServicesSnapshot,
  overviewSnapshot,
  researchReviewSnapshot,
  serviceOperationsSnapshot,
} from '../mocks/demoData';

function delayed<T>(value: T, duration = 340): Promise<T> {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(value), duration);
  });
}

export const demoAdapter = {
  getOverviewSnapshot: () => delayed(overviewSnapshot, 320),
  getServiceOperationsSnapshot: () => delayed(serviceOperationsSnapshot, 380),
  getAssistantSnapshot: () => delayed(assistantSnapshot, 360),
  getCitizenServicesSnapshot: () => delayed(citizenServicesSnapshot, 420),
  getResearchReviewSnapshot: () => delayed(researchReviewSnapshot, 390),
  getAdministrationSnapshot: () => delayed(administrationSnapshot, 300),
};
