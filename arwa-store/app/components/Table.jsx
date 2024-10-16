import { Card, Typography, IconButton } from "../MT";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
export default function Table() {
  const TABLE_ROWS = [
    {
      id: 1,
      name: "Abderrahim Oujdi",
      tele: "0651565748",
      ville: "Taroudant",
      adress: "Sidi Belkass Rue 02 N° 15",
    },
    {
      id: 2,
      name: "Fayza Bouderqua",
      tele: "0678961452",
      ville: "Agadir",
      adress: "Hay Essaada Rue 1613 N° 1",
    },
    {
      id: 3,
      name: "Arwa Oujdi",
      tele: "0762850323",
      ville: "Rabat",
      adress: "hay farah rue 10 N° 166",
    },
  ];
  const TABLE_HEAD = ["Nom et Prénom", "Téléphone", "ville", "Adress", ""];
  return (
    <Card className="h-full w-full rounded-none">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-slate-100 bg-[#b0bec5] p-4 "
              >
                <Typography
                  variant="small"
                  color="slate"
                  className="font-normal leading-none opacity-80 "
                  style={{ color: "#37474f" }}
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map(({ id, name, tele, ville, adress }, index) => {
            const isLast = index === TABLE_ROWS.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-slate-70";

            return (
              <tr key={id}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="slate"
                    className="font-normal"
                  >
                    {name}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="slate"
                    className="font-normal"
                  >
                    {tele}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="slate"
                    className="font-normal"
                  >
                    {ville}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="slate"
                    className="font-normal"
                  >
                    {adress}
                  </Typography>
                </td>
                <td className={classes}>
                  <IconButton color="slate" variant="text">
                    <PencilIcon className="h-4 w-4" />
                  </IconButton>
                  <IconButton color="deep-orange" variant="text">
                    <TrashIcon className="h-4 w-4 color" />
                  </IconButton>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}
