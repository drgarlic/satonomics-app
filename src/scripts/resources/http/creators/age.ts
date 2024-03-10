import { anyCohortAttributes, createBackEndResource } from ".";
import { scales } from "..";

export function createAgeResources() {
  const ageCohortAttributes = [...anyCohortAttributes];

  type AgeResources = Record<
    ReturnType<typeof computeAgeAttributeName>,
    ResourceHTTP
  >;

  const partialAgeResources: Partial<AgeResources> = {};

  scales.forEach((scale) => {
    ageCohorts.forEach(({ key: ageKey, route: ageRoute }) => {
      ageCohortAttributes.forEach(
        ({ key: cohortAttributeKey, route: cohortAttributeRoute }) => {
          const attributeName = computeAgeAttributeName(
            scale,
            ageKey,
            cohortAttributeKey,
          );
          partialAgeResources[attributeName] = createBackEndResource(
            `/${scale}-to-${ageRoute ? ageRoute + "-" : ""}${cohortAttributeRoute}`,
          );
        },
      );
    });
  });

  return partialAgeResources as AgeResources;
}

const computeAgeAttributeName = (
  scale: ResourceScale,
  ageCohortName: AgeCohortKey,
  ageCohortAttributeName: AgeCohortAttributeKey,
): `${ResourceScale}To${AgeCohortKey}${AgeCohortAttributeKey}` =>
  `${scale}To${ageCohortName}${ageCohortAttributeName}`;

export const ageCohorts = [
  {
    key: "" as const,
    route: "",
  },
  {
    key: "Lth" as const,
    route: "lth",
  },
  {
    key: "Sth" as const,
    route: "sth",
  },
  { key: "UpTo1d" as const, route: "up_to_1d" },
  { key: "UpTo7d" as const, route: "up_to_7d" },
  { key: "UpTo1m" as const, route: "up_to_1m" },
  { key: "UpTo2m" as const, route: "up_to_2m" },
  { key: "UpTo3m" as const, route: "up_to_3m" },
  { key: "UpTo4m" as const, route: "up_to_4m" },
  { key: "UpTo5m" as const, route: "up_to_5m" },
  { key: "UpTo6m" as const, route: "up_to_6m" },
  { key: "UpTo1y" as const, route: "up_to_1y" },
  { key: "UpTo2y" as const, route: "up_to_2y" },
  { key: "UpTo3y" as const, route: "up_to_3y" },
  { key: "UpTo5y" as const, route: "up_to_5y" },
  { key: "UpTo7y" as const, route: "up_to_7y" },
  { key: "UpTo10y" as const, route: "up_to_10y" },
  { key: "From1dTo7d" as const, route: "from_1d_to_7d" },
  { key: "From7dTo1m" as const, route: "from_7d_to_1m" },
  { key: "From1mTo3m" as const, route: "from_1m_to_3m" },
  { key: "From3mTo6m" as const, route: "from_3m_to_6m" },
  { key: "From6mTo1y" as const, route: "from_6m_to_1y" },
  { key: "From1yTo2y" as const, route: "from_1y_to_2y" },
  { key: "From2yTo3y" as const, route: "from_2y_to_3y" },
  { key: "From3yTo5y" as const, route: "from_3y_to_5y" },
  { key: "From5yTo7y" as const, route: "from_5y_to_7y" },
  { key: "From7yTo10y" as const, route: "from_7y_to_10y" },
  { key: "From10yToEnd" as const, route: "from_10y_to_end" },
  { key: "2009" as const, route: "2009" },
  { key: "2010" as const, route: "2010" },
  { key: "2011" as const, route: "2011" },
  { key: "2012" as const, route: "2012" },
  { key: "2013" as const, route: "2013" },
  { key: "2014" as const, route: "2014" },
  { key: "2015" as const, route: "2015" },
  { key: "2016" as const, route: "2016" },
  { key: "2017" as const, route: "2017" },
  { key: "2018" as const, route: "2018" },
  { key: "2019" as const, route: "2019" },
  { key: "2020" as const, route: "2020" },
  { key: "2021" as const, route: "2021" },
  { key: "2022" as const, route: "2022" },
  { key: "2023" as const, route: "2023" },
  { key: "2024" as const, route: "2024" },
];

export const ageCohortsKeys = ageCohorts.map(({ key }) => key);
