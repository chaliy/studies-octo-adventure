namespace Tests.Services
{
    using System.IO;
    using System.Linq;
    using FluentAssertions;
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using SolidDip.Infrastructure;
    using SolidDip.Model;
    using SolidDip.Services;

    [TestClass]
    public class ComponentsStorageTests
    {
        [TestMethod]
        public void Should_save_query_components()
        {
            Db.Reset();
            ComponentsStorage.Save(new[]
            {
                new CircuitComponent
                {
                    PartName = "DIP8",
                    Data = File.ReadAllBytes(@"Data\DIP8.sldprt"),
                    ZeroXMm = 3.25,
                    ZeroYMm = 0.5,
                    ZeroZMm = 3.85,
                    ZeroAngle = 90
                },
                new CircuitComponent
                {
                    PartName = "Diode0_4",
                    Data = File.ReadAllBytes(@"Data\Diode0_4.sldprt"),
                    ZeroXMm = 0,
                    ZeroYMm = 0,
                    ZeroZMm = 0,
                    ZeroAngle = 90
                }
            });

            var components = ComponentsStorage.AllComponents();

            components.Should().HaveCount(2);
            var dip8 = components.First(x => x.PartName == "DIP8");
            dip8.Data.Should().NotBeEmpty();
            dip8.ZeroXMm.Should().Be(3.25);
        }
    }
}
