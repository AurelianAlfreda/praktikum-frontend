type FooterProps = {
  appName: string;
  keterangan: string;
};

export default function Footer({ appName, keterangan }: FooterProps) {
  return (
    <footer className="app-footer py-3 mt-auto">
      <div className="container text-center small">
        {appName} | {keterangan}
      </div>
    </footer>
  );
}