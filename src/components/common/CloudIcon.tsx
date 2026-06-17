import aiHypercomputerIcon from '../../assets/gcp-icons/products/svg/ai-hypercomputer.svg';
import apigeeIcon from '../../assets/gcp-icons/products/svg/apigee.svg';
import bigqueryIcon from '../../assets/gcp-icons/products/svg/bigquery.svg';
import cloudRunIcon from '../../assets/gcp-icons/products/svg/cloud-run.svg';
import cloudSqlIcon from '../../assets/gcp-icons/products/svg/cloud-sql.svg';
import cloudStorageIcon from '../../assets/gcp-icons/products/svg/cloud-storage.svg';
import computeEngineIcon from '../../assets/gcp-icons/products/svg/compute-engine.svg';
import gkeIcon from '../../assets/gcp-icons/products/svg/gke.svg';
import lookerIcon from '../../assets/gcp-icons/products/svg/looker.svg';
import securityOperationsIcon from '../../assets/gcp-icons/products/svg/security-operations.svg';
import vertexAiIcon from '../../assets/gcp-icons/products/svg/vertex-ai.svg';

const ICONS: Record<string, string> = {
  'ai-hypercomputer': aiHypercomputerIcon,
  apigee: apigeeIcon,
  bigquery: bigqueryIcon,
  'cloud-run': cloudRunIcon,
  'cloud-sql': cloudSqlIcon,
  'cloud-storage': cloudStorageIcon,
  'compute-engine': computeEngineIcon,
  gke: gkeIcon,
  looker: lookerIcon,
  'security-operations': securityOperationsIcon,
  'vertex-ai': vertexAiIcon,
};

type CloudIconProps = {
  name: string;
  label: string;
  className?: string;
};

export function CloudIcon({ name, label, className = '' }: CloudIconProps) {
  const src = ICONS[name];

  if (!src) {
    return <span className={['cloud-icon', 'cloud-icon--fallback', className].filter(Boolean).join(' ')}>{label.slice(0, 2)}</span>;
  }

  return <img className={['cloud-icon', className].filter(Boolean).join(' ')} src={src} alt={label} />;
}
