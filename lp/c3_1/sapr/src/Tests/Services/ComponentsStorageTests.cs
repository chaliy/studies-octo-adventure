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
                    Data = File.ReadAllBytes(@"Data\DIP8.sldprt")
                },
                new CircuitComponent
                {
                    PartName = "Diode0_4",
                    Data = File.ReadAllBytes(@"Data\Diode0_4.sldprt")
                }
            });

            var components = ComponentsStorage.AllComponents();

            components.Should().HaveCount(2);
            var dip8 = components.First(x => x.PartName == "DIP8");
            dip8.Data.Should().NotBeEmpty();
        }
    }
}
